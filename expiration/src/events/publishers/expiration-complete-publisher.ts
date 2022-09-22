import { ExpirationCompleteEvent, Publisher, Subjects } from "@chticketsorg/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}