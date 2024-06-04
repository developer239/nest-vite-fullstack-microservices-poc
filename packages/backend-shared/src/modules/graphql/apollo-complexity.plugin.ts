import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { GraphQLSchema, separateOperations } from 'graphql'
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity'

export class ApolloComplexityPlugin implements ApolloServerPlugin {
  private schema: GraphQLSchema

  constructor(private readonly maxComplexity: number) {}

  public async serverWillStart(service: any) {
    this.schema = service.schema
  }

  public async requestDidStart() {
    return {
      didResolveOperation: async ({ request, document }: any) => {
        const complexity = getComplexity({
          schema: this.schema,
          query: request.operationName
            ? separateOperations(document)[request.operationName]
            : document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        })

        if (complexity > this.maxComplexity) {
          throw new Error(
            `Sorry, too complicated query (complexity: ${complexity}, max complexity: ${this.maxComplexity})`
          )
        }
      },
    }
  }
}
