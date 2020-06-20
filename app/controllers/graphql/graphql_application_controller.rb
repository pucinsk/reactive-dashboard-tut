# frozen_string_literal: true

  module Graphql
    # base class of all GraphqlControllers
    class GraphqlApplicationController < GraphqlRails::Controller
      private

      def current_account
        graphql_request.context[:current_account]
      end
    end
  end
