import React from 'react';
import {configure ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//Enzyme  adapter is a must to connect enzyme with our React version
configure({adapter: new Adapter() });

//shallow function 


describe("<NavigationItems/>", ()=>{
    let wrapper;
    beforeEach( ()=>{
             wrapper= shallow(<NavigationItems />);
    });
    it('should render two <NavigationItem/> if the user is not authenticated',()=>{
     
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> if the user is  authenticated',()=>{
      wrapper.setProps( {isAuthentificated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
     });

     it('should render three <NavigationItem/> Logout',()=>{
        wrapper.setProps( {isAuthentificated:true});
          expect(wrapper.contains( <NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true) ;
       });

});