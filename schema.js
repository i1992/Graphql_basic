const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,

} = require('graphql');

//CustomerType

const HitsType = new GraphQLObjectType({
  name : 'Recipe',
  fields:() => ({
    lable: {
      type : GraphQLString
    },
    source : {
      type: GraphQLString
    }
  })
})



//Root Query
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields : {
    hits :{
      type: HitsType,
      args:{
        food:{type : GraphQLString}
      },
      resolve(parentValue,args){
        return axios.get('https://api.edamam.com/search?q='+ args.food +'&app_id=656407a6&app_key=3c0e82b53af12dada5250a7f683e850e')
            .then(({ hits }) => hits.map(({ recipe }) => recipe))
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query :  RootQuery
});
