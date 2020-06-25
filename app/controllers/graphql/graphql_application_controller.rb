# frozen_string_literal: true

  module Graphql
    # base class of all GraphqlControllers
    class GraphqlApplicationController < GraphqlRails::Controller
      private

      def current_account
        graphql_request.context[:current_account]
      end

      def require_account
        return if current_account

        raise GraphQL::ExecutionError.new('Not authenticated!', extensions: { code: 'UNAUTHENTICATED' })
      end
    end
  end
