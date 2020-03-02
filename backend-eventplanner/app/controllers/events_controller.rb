class EventsController < ApplicationController
  def new
  end

  def index
    @events = Event.all
    render json: @events
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def create
    @event = Event.new(
      id:params[:id], title:params[:title], date:params[:date], start_time:params[:start_time], 
      end_time:params[:end_time], min_age:params[:min_age], max_attendees:params[:max_attendees], 
      img_url:params[:img_url], location:params[:location]
    )
    if @event.save
      render json: @event.to_json
    else
      render json: ("Event creation unsuccessful").to_json
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render json: ("Event successfully deleted")   # do we want to return the destroyed json for an undo opetion?
  end
end