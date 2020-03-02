class EventsController < ApplicationController
  def new
  end

  def index
    @events = Event.all
    render json: @events
  end

  def show
    @event = Event.find(params[:id]);
    render json: @event
  end

  def create
    @event = Event.new(event_params);
    
    if @event.save
      render json: @event.to_json
    else
      render json: ("Event creation unsuccessful").to_json
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render json: ("Event successfully deleted")   # do we want to return the destroyed json for an undo option?
  end

  #strong params needed.
  private 
  def event_params
    params.require(:event).permit(:id, :title, date:, :start_time, :end_time, :min_age, max_attendees, :img_url, :location)
  end
end