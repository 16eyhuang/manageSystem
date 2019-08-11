export default {
  changeRouterMatched(context){
    context.commit('changeRouterMatched');
  },
  setNewRouter(context){
    context.commit('setNewRouter');
  },
  changePageNumber(context){
    context.commit('changePageNumber');
  }
};
