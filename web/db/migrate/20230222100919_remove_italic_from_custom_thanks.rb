class RemoveItalicFromCustomThanks < ActiveRecord::Migration[7.0]
  def change
    remove_column :custom_thanks, :italic, :boolean
  end
end
