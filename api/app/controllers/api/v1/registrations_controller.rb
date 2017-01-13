module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      def destroy
        puts 'fffffsfdfsdfsdfsd'
        super
      end
    end
  end
end