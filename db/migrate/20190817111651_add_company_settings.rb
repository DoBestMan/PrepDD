class AddCompanySettings < ActiveRecord::Migration[5.2]
  change_table :companies do |t|
    t.boolean :auto_pdf, default: false
    t.boolean :auto_watermark, default: false
    t.boolean :preview_only, default: false
  end
end
