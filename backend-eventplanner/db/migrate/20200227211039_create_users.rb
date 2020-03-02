class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name #real name
      t.integer :age #probably want a validation
      t.string :email 
      t.integer :phone_number

      t.timestamps
    end
  end
end
