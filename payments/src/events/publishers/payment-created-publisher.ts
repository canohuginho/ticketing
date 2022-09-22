import { PaymentCreatedEvent, Publisher, Subjects } from "@chticketsorg/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}