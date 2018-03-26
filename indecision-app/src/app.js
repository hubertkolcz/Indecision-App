//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this); 
        this.handlePick = this.handlePick.bind(this); 
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: props.options 
        };  
    }  
    handleDeleteOptions() {
        this.setState(() => {
            return { 
                options: [] 
            };
        });
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => {
            return { 
                options: prevState.options.concat([option])
            }
        })
    }
    render() {
        const subtitle = '!! Put you life in the hands of a computer';
        return (
            <div> 
                <Header /> 
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions} 
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}                           
                />
            </div>
        );
    }
};

IndecisionApp.defaultProps = {
    options: []
};
const Header = (props) => {
    return (
        <div> 
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};
Header.defaultProps = {
    title: 'Title'
};
const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};
const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            <h3>You have {props.options.length} options:</h3>
            <ul>
                {
                    props.options.map((option,index) => <Option key={option} optionText={option} />) 
                }
            </ul>
        </div>
    );
};
const Option = (props) => {
    return (
        <li> 
            Option: {props.optionText} 
        </li>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return { error };
        });
    }
    render() {
        return (
            <div>
                <p>First action: </p>
                {this.state.error && <p>{this.state.error}</p>} 
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button> 
                </form>
            </div>
        );
    }
};

//Stateless component
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     ) 
// }
   
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));