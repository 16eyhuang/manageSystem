export default {
  isCollapse: state=>state.isCollapse,
  user:(state)=>{
    if(!state.user.username){
      state.user=JSON.parse(JSON.stringify(localStorage));
    }
    return state.user;
  },
  routerMatched: state=>state.routerMatched,
  newrouter:state=>state.newrouter, //动态路由
  isLoadComplete: (state)=>{
    if(!state.isLoadComplete){
      state.isLoadComplete=JSON.parse(JSON.stringify(localStorage.getItem('isLoadComplete')));
    }
    return state.isLoadComplete;
  },
  step: state=>state.step,
  stepForm:state=>state.stepForm
};
