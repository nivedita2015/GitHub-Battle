var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props){
    var languages = ['All','Java','JavaScript','Ruby','Python','CSS']
    return (
        <ul className = 'languages'>
            {languages.map( (lang) => {
                    return ( 
                        <li 
                            style = {lang === props.selectedLanguage ? {color: '#d0021b'} : null}
                            key={lang} 
                            onClick={props.onSelect.bind(null,lang)} > {lang}
                        </li>
                        );
                })}
            </ul>
    )
}


function RepoGrid(props){
    return (
        <ul className="popular-lists">
        {props.repos.map(function(repo,index) {
         return (
             <li key={repo.name} className='popular-item'>
                <div className='popular-rank'>{index+1}</div>
                <ul className='splace-list-items'>
                    <li><img className='avatar' src = {repo.owner.avatar_url} /></li>
                    <li><a href={repo.html_url}>{repo.name}</a></li>
                    <li>@{repo.owner.login}</li>
                    <li>{repo.stargazers_count} stars</li>
                </ul>
            </li>
         );
    })
}
    </ul>
    );
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}


SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount(){        
       this.updateLanguage(this.state.selectedLanguage); 
    }
    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        
        api.fetchPopularRepos(lang)
        .then(function(repos){
            this.setState(function(){
                return {
                    repos:repos
                }
            })
        }.bind(this));
    }
    
    
    render(){
        return(
            <div>
                <SelectLanguage 
                    selectedLanguage = {this.state.selectedLanguage}
                    onSelect = {this.updateLanguage} />
            {!this.state.repos 
            ? <p>Loading</p>
            : <RepoGrid repos = { this.state.repos} />}
            
            </div>
        )
    }
}

module.exports = Popular;