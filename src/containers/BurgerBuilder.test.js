import React from 'react';
import {configure ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../components/BuildControls/BuildControls';


//Enzyme  adapter is a must to connect enzyme with our React version
configure({adapter: new Adapter() });


describe('<BurgerBuilder/>', ()=>{

    let wrapper;
    beforeEach( ()=>{
             wrapper=shallow(<BurgerBuilder  onInitilizeIngredients={()=>{}  }
             
             purshaseBurgerInit={()=>{}  }
             />);

    });

    it('should render <BuildControls/> if ingredients are not null', ()=>{
        wrapper.setProps({ingredients:{ Salad:1}});
            expect(wrapper.find(BuildControls)).toHaveLength(1);
    });



});

