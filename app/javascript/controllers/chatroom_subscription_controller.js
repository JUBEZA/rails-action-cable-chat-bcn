import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  // connect() {
  //   this.channel = createConsumer().subscription.create(
  //     { channel: "ChatroomChannel", id: this.chatroomIdValue},
  //     { recived: data => console.log(data)}
  //   )
  //   console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`)
  // }
  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      {
        received: (data) => {
          console.log(data);
        }
      }
    );
    console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`);
}
}
