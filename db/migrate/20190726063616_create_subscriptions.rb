class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.string  :description
      t.integer :max_users
      t.integer :max_storage
      t.integer :additional_storage
      t.boolean :auto_pdf
      t.boolean :auto_watermark
      t.boolean :modify_subscription

      t.timestamps
    end
  end
end
