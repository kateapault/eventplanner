class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :title
      t.date :date
      t.time :start_time
      t.time :end_time
      t.integer :min_age
      t.integer :max_attendees
      t.string :img_url
      t.string :location

      t.timestamps
    end
  end
end
