export default {
  changeCollapseStatus(state){
    state.isCollapse=!state.isCollapse;
  },
  setUserInfo(state,user){
    state.user=user;
  },
  changeRouterMatched(state,router) {
    state.routerMatched=router;
  },
  setNewRouter(state,newrouter) {
    state.newrouter=newrouter;
  },
  changeLoadStatus(state){
    state.isLoadComplete=true;
  },
  changePageNumber(state,page){
    state.step=page;
  },
  setStepForm(state,data){
    state.stepForm=data;
  }
};
