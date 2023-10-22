# == Schema Information
#
# Table name: menu_orders
#
#  id         :uuid             not null, primary key
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
require 'rails_helper'

RSpec.describe MenuOrder, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
