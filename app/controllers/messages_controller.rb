class MessagesController < ApplicationController
  # content, chatroom, user
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = Message.new(message_params)
    @message.chatroom = @chatroom
    @message.user = current_user

    if @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        render_to_string(
          partial: "messages/message",
          locals: { message: @message }
        )
      )
    else
      redirect_to chatroom_path(@chatroom)
      render "chatrooms/show", status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
