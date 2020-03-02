# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create( {
    username: 'my_username',
    name: "Anne Onimuss",
    age: 30,
    email: 'anne@onimuss.com',
    phone_number: '888-888-8888'
} )

User.create( {
    username: 'other_username',
    name: "Bubba",
    age: 35,
    email: 'bubba@gmail.com',
    phone_number: '777-777-7777'
} )


user_id = [1,1,2,2]
title = ["Birthday Party", "Concert", "Drag Show"]
date = ['2020-03-17','2020-04-17','2020-05-16']
start_time = ['4:30 PM','6:45 PM','10:00 PM']
end_time = ['7:30 PM', '10:15 PM', '1:00 AM']
min_age = [nil, 16, 21]
max_attendees = [30, 450, 60]
img_url = [nil, nil, nil]
location = ['Manhattan','Newark','Brooklyn']

for i in 0..4
    Event.create( {
        user_id: user_id[i],
        title: title[i],
        date: date[i],
        start_time: start_time[i],
        end_time: end_time[i],
        min_age: min_age[i],
        max_attendees: max_attendees[i],
        img_url: img_url[i],
        location: location[i]
    } )
end