# == Schema Information
#
# Table name: restaurants
#
#  id           :bigint           not null, primary key
#  city         :string
#  email        :string
#  name         :string
#  phone_number :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Restaurant < ApplicationRecord
end
