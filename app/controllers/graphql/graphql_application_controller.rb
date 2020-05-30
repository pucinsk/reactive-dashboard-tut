# frozen_string_literal: true

  module Graphql
    # base class of all GraphqlControllers
    class GraphqlApplicationController < GraphqlRails::Controller
      action(:dummy_mutation).returns('String')

      def dummy_mutation
        'GrapQL must have at least one query and mutation.' \
          'Remove me after your first real query will be implemented.'
      end
    end
  end
