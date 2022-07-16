import AdBanner from "../components/AdBanner";

export default function Home() {

    let specialty = {
        name: 'a'
    }

    return (
        <div>
            <AdBanner />
            <div class="bg-white py-3">
                <div class="container">
                    <div class="mb-4">
                        <h1 class="hero-heading">The haha First Step In Client Retention! TreatmentFirst is the Nationwide Directory of <br/> Doctors and Medical Providers who provide services on a Lien or Letter of Protection.</h1>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <div class="rounded-3" style={{backgroundColor:'#F1F1F1', padding: '20px'}}>
                                <form method="POST" action="{% url 'filters' %}">
                                    <div class="mb-3">
                                        <h5 style={{color:'#1c6bb0'}}>Quick Search by Specialty, and Location <br/> Example "Miami Chiropractor"</h5>
                                        <div class="d-flex">
                                            <input class="form-control me-3 " type="text" name="name" id="name" placeholder="Select Medical Provider Specialty: Chiropractor " aria-label="default input example" />
                                            <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                                <h5 class="text-primary">Advanced Search</h5>
                                <form method="POST" action="{% url 'advance_filters' %}">
                                    <div class="row gx-3">
                                        <h6 class="col-md-5 pt-2">Select a Treatment Specialty:</h6>
                                        <div class="col-md-7 mb-3">
                                            <select class="form-select" name="specialty" aria-label="Default select example">

                                                <option selected>Chiropractor</option>
                                                {/* {% for specialty in specialties %} */}
                                                <option value="{{specialty.name}}">{ specialty.name }</option>
                                                {/* {% endfor %} */}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row gx-3">
                                        <div class="col-md-6">
                                            <input class="form-control mb-3" type="text" name="address" id="address" placeholder="Address " aria-label="default input example" />
                                        </div>
                                        <div class="col-md-6">
                                            <input class="form-control mb-3" name="city" id="city" i type="text" placeholder="City" aria-label="default input example" />
                                        </div>
                                    </div>
                                    <div class="row gx-3">
                                        <div class="col-md-6 mb-3 mb-md-0">
                                            <select class="form-select" name="state" aria-label="Default select example">

                                                <option value="default" selected>--State--</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-3 mb-md-0">
                                            <div class="d-flex">
                                                <input class="form-control me-3" type="text" placeholder="Zip" name="postal" id="postal" aria-label="default input example" />
                                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="card">
                                <div class="card-body">
                                    <h5>How to Use TreatmentFirst.com</h5>
                                    <p>Quickly search for a Medical Provider by entering a City Name or Zip Code. You may include a Provider Category like 'Chiropractor' to just show that type of Provider</p>
                                    <p>Use the Advanced Search to input a specific address, choose a Provider Category, and optionally screen results by members of a Medical Provider Network for Worker's Compensation cases
                                        <a class="ReadMore link" href="#">Read More</a>
                                    </p>

                                    <h6>Video Explaining
                                        TreatmentFirst.com</h6>
                                    <iframe class="w-100" src='https://www.youtube.com/embed/E7wJTI-1dvQ56'></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}