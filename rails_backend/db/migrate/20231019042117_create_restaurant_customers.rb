class CreateRestaurantCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurant_customers, id: :uuid do |t|
      t.references :restaurant, null: false, foreign_key: true, type: :uuid
      t.references :customer, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
