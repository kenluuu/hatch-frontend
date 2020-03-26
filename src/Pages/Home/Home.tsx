import React, { Component, Fragment, ReactNode } from 'react';
import { applicant, filter, CreditScoreFilter } from '../../Types/types';
import { Table, Loader, Filter } from '../../Components';
import { Container } from 'reactstrap';


interface State {
  applicants: Array<applicant>,
  filteredApplicants: Array<applicant>,
  applyedFilters: filter,
  isLoading: boolean
}

const initalState: State = {
  applicants: [],
    filteredApplicants: [],
    applyedFilters: { 
      name: "",
      credit: CreditScoreFilter.All
    },
    isLoading: false
}

class Home extends Component<{}, State> {
  state: State = initalState
	
  async componentDidMount() {
    const url = "http://private-041255-sakura3.apiary-mock.com/applicants";
		this.setState({ isLoading: true })
		try {
			let res = await fetch(url);
      let data = await res.json();
      this.setState({ applicants: data, filteredApplicants: data, isLoading: false });
    } catch(error) {
			console.log(error);
			this.setState({ isLoading: false });
    } 
  }

  filterApplicantsByName = (nameInput: string): Array<applicant> => {
    const filteredApplicants = this.state.applicants.filter(applicant => {
      const fullname = applicant.first_name + applicant.last_name;
      return fullname.toLowerCase().indexOf(nameInput.toLowerCase()) !== -1;
			
    })
    return filteredApplicants;
  }

  filterApplicantsByCredit = (applicants: Array<applicant>, creditFilter: CreditScoreFilter): Array<applicant> => {
    switch(creditFilter) {
      case CreditScoreFilter.All:
        return applicants;
      case CreditScoreFilter.Ascending:
        return applicants.sort((a, b) => a.credit_indicator - b.credit_indicator);
      case CreditScoreFilter.Descending:
        return applicants.sort((a, b) => b.credit_indicator - a.credit_indicator);
      case CreditScoreFilter.Bad:
        return applicants.filter(applicant => applicant.credit_indicator >= 0 && applicant.credit_indicator <= 5);
      case CreditScoreFilter.Neutral:
        return applicants.filter(applicant => applicant.credit_indicator > 5 && applicant.credit_indicator <= 7);  
      case CreditScoreFilter.Good:
        return applicants.filter(applicant => applicant.credit_indicator > 7 && applicant.credit_indicator <= 10);
      default:
        return applicants; 
    }
  }

  applyAllFiltersToApplicants = (nameInput: string, creditFilter: CreditScoreFilter): Array<applicant> => {
    let filteredApplicants = this.filterApplicantsByName(nameInput);
    filteredApplicants = this.filterApplicantsByCredit(filteredApplicants, creditFilter);
    return filteredApplicants;
  } 


  handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    const credit = this.state.applyedFilters.credit;
    const filteredApplicants = this.applyAllFiltersToApplicants(input, credit);
    this.setState({ filteredApplicants, applyedFilters: { name: input, credit }});
  }

  handleCreditFilterChange = (creditFilter: string): void => {
    const name = this.state.applyedFilters.name;
    const credit = Object(CreditScoreFilter)[creditFilter];
    const filteredApplicants = this.applyAllFiltersToApplicants(name, credit);
    this.setState({ filteredApplicants, applyedFilters: { name, credit }});
  }

  showTable = (): ReactNode => {
    return (
      <Fragment>
        <Filter 
          applyedFilters={this.state.applyedFilters} 
          handleNameFilterChange={this.handleNameFilterChange} 
          handleCreditFilterChange={this.handleCreditFilterChange}
        />
        <Table applicants={this.state.filteredApplicants} />
      </Fragment>
    )
  }
  render() {
    return (
      <Container className="container">
        {
          this.state.isLoading === true ? <Loader /> : this.showTable()
        }
      </Container>
    )
  }
}

export default Home;
