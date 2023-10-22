# == Schema Information
#
# Table name: menus
#
#  id           :uuid             not null, primary key
#  cooking_time :integer
#  description  :text
#  name         :string           not null
#  price        :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  admin_id     :uuid             not null
#  staff_id     :uuid             not null
#
# Indexes
#
#  index_menus_on_admin_id  (admin_id)
#  index_menus_on_staff_id  (staff_id)
#
# Foreign Keys
#
#  fk_rails_...  (admin_id => admins.id)
#  fk_rails_...  (staff_id => staffs.id)
#
class Menu < ApplicationRecord
  belongs_to :admin
  belongs_to :staff
  has_many :menu_orders, dependent: :destroy
  has_many :orders, through: :menu_orders
end
