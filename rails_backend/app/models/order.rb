# == Schema Information
#
# Table name: orders
#
#  id         :uuid             not null, primary key
#  status     :integer          default("placed")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  staff_id   :uuid             not null
#
# Indexes
#
#  index_orders_on_staff_id  (staff_id)
#
# Foreign Keys
#
#  fk_rails_...  (staff_id => staffs.id)
#
class Order < ApplicationRecord
  belongs_to :staff
  has_many :menu_orders, dependent: :destroy
  has_many :menus, through: :menu_orders
  has_many :order_tables, dependent: :destroy
  has_many :tables, through: :order_tables
  enum status: %i[placed in_progress ready_for_pickup out_for_delivery delivered]

  def menu_data
    menus.map do |menu|
      menu_hash = menu.as_json
      menu_hash['quantity'] = menu_orders.find_by(menu_id: menu.id)&.quantity
      menu_hash
    end
  end
end
