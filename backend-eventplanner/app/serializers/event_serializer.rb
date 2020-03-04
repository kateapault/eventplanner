class EventSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :date, :start_time, :end_time, :min_age, :max_attendees, :img_url, :location

  has_many :tickets
end
