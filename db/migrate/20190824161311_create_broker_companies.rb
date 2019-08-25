class CreateBrokerCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :broker_companies do |t|
      t.belongs_to :child_broker
      t.belongs_to :parent_broker

      t.timestamps
    end
  end
end
