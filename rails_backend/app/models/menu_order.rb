# == Schema Information
#
# Table name: menu_orders
#
#  id         :uuid             not null, primary key
#  quantity   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  menu_id    :uuid             not null
#  order_id   :uuid             not null
#
# Indexes
#
#  index_menu_orders_on_menu_id   (menu_id)
#  index_menu_orders_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (menu_id => menus.id)
#  fk_rails_...  (order_id => orders.id)
#
class MenuOrder < ApplicationRecord
  belongs_to :menu
  belongs_to :order
end
