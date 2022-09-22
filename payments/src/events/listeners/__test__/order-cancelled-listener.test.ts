import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCancelledEvent, OrderStatus } from "@chticketsorg/common";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { Order } from "../../../models/order";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
    });
    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { data, listener, msg, order }
}

it('updates the status of the order', async () => {
    const { data, listener, msg, order } = await setup();
    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('acks the message', async () => {
    const { data, listener, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})