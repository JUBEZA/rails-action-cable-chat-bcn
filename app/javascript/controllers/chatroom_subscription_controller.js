import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static targets = ["messages"]
  static values = {
    chatroomId: Number
  }

  connect () {
    console.log(`Connecting to the ActionCable channel with id ${this.chatroomIdValue}`)

    createConsumer().subscription.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) =>  { this.#insertMessageAndScrollDown(data) }}
    )
  }

  disconnect() {
    console.log("Unsubscribed from the chatroom")
    this.channel.unsubscribe()
  }


  resetForm(event) {
    event.target.reset()
  }

  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}

  // connect() {
  //   this.channel = createConsumer().subscription.create(
  //     { channel: "ChatroomChannel", id: this.chatroomIdValue},
  //     { recived: data => console.log(data)}
  //   )
  //   console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`)
  // }

//   connect() {
//     this.channel = createConsumer().subscriptions.create(
//       { channel: "ChatroomChannel", id: this.chatroomIdValue },
//       {
//         received: (data) => {
//           console.log(data);
//         }
//       }
//     );
//     console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`);
// }
// }
