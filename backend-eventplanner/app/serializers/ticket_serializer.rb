class TicketSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :event_id
end
