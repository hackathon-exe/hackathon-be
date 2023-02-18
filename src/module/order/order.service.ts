import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ErrorHelper } from 'src/helpers/error.helper';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { EntityManager, Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_URL } from 'src/environments';
import { UserEntity } from '../user/entities/user.entity';
import { ItemEntity } from '../item/entities/item.entity';
import { ERROR_MESSAGE } from 'src/common/constant/messages.constant';
import { OrderItemEntity } from '../orderItem/entities/orderItem.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export default class OrderService {
    constructor(
        private readonly httpService: HttpService,
        private readonly entityManage: EntityManager,

        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,

    ) { }

    async findOrderById(
        orderId: string,
    ): Promise<OrderEntity> {
        const order = await this.orderRepo
            .createQueryBuilder('order')
            .where('order.id = :orderId', { orderId })
            .getOne();
        if (!order) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.ORDER.NOT_FOUND);
        }
        return order;
    }
    getPayPalAccessToken(): Observable<AxiosResponse<[]>> {
        const form = new URLSearchParams();
        form.append('grant_type', 'client_credentials');
        return this.httpService.post(
            `${PAYPAL_URL}/v1/oauth2/token`,
            form,
            {
                auth: {
                    username: PAYPAL_CLIENT_ID,
                    password: PAYPAL_CLIENT_SECRET
                },
                headers: {
                    Content_type: 'application/x-www-form-urlencoded',
                }
            },
        )
            .pipe(map((response) => response.data))
            .pipe(
                catchError((err) =>
                    of(ErrorHelper.BadGatewayException(err.response.data.errorMessage)),
                ),
            );
    }

    async createOrder(
        dto: CreateOrderDTO,
    ): Promise<OrderEntity> {
        const response = await lastValueFrom(
            this.getPayPalAccessToken(),
        );
        let token = `Bearer ${response['access_token']}`;
        const user = await this.entityManage.findOne(UserEntity, {
            where: { id: dto.userId },
        });
        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        const orderItems = dto.itemId.map((itemId) => {
            const orderItem = new OrderItemEntity();
            orderItem.itemId = itemId;
            return orderItem;
        });
        const itemList = dto.itemId.map(async (itemId) => {
            const item = await this.entityManage.findOne(ItemEntity, {
                where: { id: itemId }
            })
            if (!item) {
                ErrorHelper.NotFoundException(ERROR_MESSAGE.ITEM.NOT_FOUND);
            }
            return {
                name: item.name,
                description: item.desc,
                quantity: dto.quantity,
                unit_amount: {
                    currency_code: "USD",
                    value: item.cost
                }
            }
        });

        const orderPaypal = await lastValueFrom(
            this.httpService.post(
                `https://api-m.sandbox.paypal.com/v2/checkout/ỏ`,
                {
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            custom_id: dto.userId,
                            items: itemList,
                            amount: {
                                "currency_code": "USD",
                                value: dto.totalCost,
                                breakdown: {
                                    "item_total": {
                                        currency_code: "USD",
                                        value: dto.totalCost
                                    }
                                }
                            }
                        }
                    ],
                    "application_context": {
                        "return_url": "https://example.com/return",
                        "cancel_url": "https://example.com/cancel"
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    }
                }
            )
                .pipe(map((response) => response.data)),
        ).catch((err) => {
            ErrorHelper.BadRequestException(err.response.data.errorMessage);
        });
        const order = await this.orderRepo.save({
            id: orderPaypal.id,
            orderItem: orderItems,
            userId: user

        });

        return order;
    }

    async capturePayment(orderId: string): Promise<Observable<AxiosResponse<[]>>> {
        const response = await lastValueFrom(
            this.getPayPalAccessToken(),
        );
        let token = `Bearer ${response['access_token']}`;
        return this.httpService.post(
            `api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            }
        )

    }
    async confirmPayment(orderId: string): Promise<Observable<AxiosResponse<[]>>> {
        const response = await lastValueFrom(
            this.getPayPalAccessToken(),
        );
        let token = `Bearer ${response['access_token']}`;
        return this.httpService.post(
            `api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/confirm-payment-source`,
            {
                payment_source: {
                    paypal: {
                        name: {
                            given_name: "John",
                            surname: "Doe"
                        },
                        email_address: "customer@example.com",
                        experience_context: {
                            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                            payment_method_selected: "PAYPAL",
                            brand_name: "EXAMPLE INC",
                            locale: "en-US",
                            landing_page: "LOGIN",
                            user_action: "PAY_NOW",
                            return_url: "https://example.com/returnUrl",
                            cancel_url: "https://example.com/cancelUrl"
                        }
                    }
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            }
        )

    }
}
