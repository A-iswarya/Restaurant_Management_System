class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks, id: :uuid do |t|
      t.text :text, null: false
      t.references :restaurant, null: false, foreign_key: true, type: :uuid
      t.references :customer, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
