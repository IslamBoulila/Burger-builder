import React from 'react' ;
import styles from './Title.module.css';

const Title = ( props)=>{

    let  titleTag=null;
switch(props.type){
    case 'h1': titleTag= <h1 className={styles.Title}>{props.children}</h1>;
    break;

    case 'h2':  titleTag= <h2 className={styles.Title}> {props.children}</h2>;
    break;

    case 'h3':  titleTag=<h3 className={styles.Title}>{props.children}</h3>;
    break;
    default : case 'h2':  titleTag= <h1 className={styles.Title}> {props.children}</h1>;

}


    return (
        titleTag
        );

}

export default Title;

