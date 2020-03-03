class TicketsController < ApplicationController
   def new
   end

   def index
    @tickets = Ticket.all
    render json: @tickets
   end

   def create
    @ticket = Ticket.new(ticket_params);
    
    if @ticket.save
      render json: @ticket.to_json
    else
      render json: ("Ticket creation unsuccessful").to_json
    end
  end

  def destroy
    @ticket = Ticket.find(params[:id])
    @ticket.destroy
    render json: ("Ticket successfully deleted")   # do we want to return the destroyed json for an undo option?
  end

  private

  def ticket_params
    params.require(:ticket).permit(:user_id, :event_id)
  end

 end