class CreateMenus < ActiveRecord::Migration[7.0]
  def change
    create_table :menus, id: :uuid do |t|
      t.string :name, null: false
      t.integer :price
      t.text :description
      t.integer :cooking_time
      t.references :restaurant, null: false, foreign_key: true, type: :uuid
      t.references :staff, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
