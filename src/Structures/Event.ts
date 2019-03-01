export type EventOptions = {
  name: string
};
export class Event {
  public constructor(options: EventOptions) {
    Object.assign(this, options);
  };
};