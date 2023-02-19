class CustomThank < ApplicationRecord
    enum emphasis: { normal: 0, bold: 1, italic: 2 } 
    validates :message, presence: true, length: { minimum: 2, maximum: 200 }
    validates :emphasis, presence: true
end
