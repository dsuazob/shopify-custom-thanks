class CreateCustomThanks < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_thanks do |t|
      t.text :message
      t.boolean :bold, default: false
      t.boolean :italic, default: false

      t.timestamps
    end
  end
end
