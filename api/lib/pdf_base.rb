class PDFBase < Prawn::Document
  def initialize
    super()
  end

  def header(app_name)
    text app_name, size: 18, style: :bold, align: :center
  end

  def title(report_title)
    text report_title, size: 10
  end

  def footer(report_footer)
    text app_name, size: 18, style: :bold, align: :left
  end

  def body(data)   
   table(data, :cell_style => { :size => 9 }) do
   end  
  end

end