Devise.setup do |config|
  # The e-mail address that mail will appear to be sent from
  # If absent, mail is sent from "please-change-me-at-config-initializers-devise@example.com"
  config.mailer_sender = "shimpiatul@hotmail.com"

  # If using rails-api, you may want to tell devise to not use ActionDispatch::Flash
  # middleware b/c rails-api does not include it.
  # See: http://stackoverflow.com/q/19600905/806956
  config.navigational_formats = [:json]
  config.secret_key = '5072da970ca33b82c000cfbdc6a4d63b1aaab4781fd46e7f5de6821c68f35ab7fa4a852a873370e24e6706a2ebd20ec4c41e69bcde448d592deff968764959ad'
end