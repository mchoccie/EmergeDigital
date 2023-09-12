import React from "react";
import "./index.css";

const Home = () => {
  window.location.replace("https://saket8kuberi.wixsite.com/website");
  return (
    <div className="index">
      <div className="banner1">
        <img
          src={require("./imgs/hbg.png").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div>
            <h1>EMERGE</h1>
            <p>Digital coaching for mental strength</p>
          </div>
        </div>
      </div>

      <div className="banner2">
        <img
          src={require("./imgs/h2bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div>
            <p>
              We are on a mission to make coaching more diverse and digital!
            </p>
          </div>
        </div>
      </div>

      <div className="banner3">
        <div>
          <img src={require("./imgs/h3b1.webp").default} alt="" />
          <div>
            <p>EMERGE is Australia's first digital coaching platform.</p>
          </div>
        </div>
        <div>
          <div>
            <p>
              We connect emerging leaders with evidence-based coaches using AI.
            </p>
          </div>
          <img src={require("./imgs/h3b2.webp").default} alt="" />
        </div>
      </div>

      <div className="banner4">
        <img
          src={require("./imgs/h4bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div>
            <p>
              Our vision is to make coaching accessible to every emerging
              leader!
            </p>
          </div>
        </div>
      </div>

      <div className="banner5">
        <img
          src={require("./imgs/h5bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div className="top">
            <p>Why evidence-based coaching?</p>
            <p>
              Our approach to coaching is science-backed and underpinned by
              Coaching Psychology.
            </p>
          </div>
          <div className="content">
            <div>
              <img src={require("./imgs/h5c1.webp").default} alt="" />
              <p>
                Better<span>THOUGHTS</span>
              </p>
              <p>
                You think more solution-focused, stength-based and
                goal-orientated.
              </p>
            </div>
            <div>
              <img src={require("./imgs/h5c2.webp").default} alt="" />
              <p>
                Better<span>WELL-BEING</span>
              </p>
              <p>
                You become mentally strong, motivated, and clear, which reduces
                your stress.
              </p>
            </div>
            <div>
              <img src={require("./imgs/h5c3.webp").default} alt="" />
              <p>
                Better<span>PERFORMANCE</span>
              </p>
              <p>
                You are more energetic, motivated and perform at your highest
                level!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="banner6">
        <img
          src={require("./imgs/h6bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <p>Digital coaching can help with:</p>
          <div class="color_11">
            Dealing with procrastination
            <br />
            <br />
            Building effective work habits
            <br />
            <br />
            Improving self-management and self-awareness
            <br />
            <br />
            Overcoming fear of public speaking&nbsp;
            <br />
            <br />
            Boost self-regulation and manage emotions&nbsp;
            <br />
            <br />
            Building confidence and self-efficacy&nbsp;
            <br />
            <br />
            Increasing ambiguity tolerance and resilience
            <br />
            <br />
            Delegating workload and managing teams
            <br />
            <br />
            Managing your inner critic and Imposter Syndrome&nbsp;
          </div>
        </div>
      </div>

      <div className="banner7">
        <div>
          <img src={require("./imgs/h7b1.webp").default} alt="" />
          <div>
            <p>Emerging Leaders </p>
            <p>
              Emerging Leaders are key individuals in their organisations who
              are in the beginning of their leadership journey.
            </p>
            <p>
              They are the next generation of leaders and shape the future
              success of their organisation.
            </p>
            <p>
              We help to build the mental strength of these leaders, so they can
              scale their organisations sustainably.
            </p>
          </div>
        </div>
        <div>
          <div>
            <p>Evidence-based coaches </p>
            <p>
              We connect you with executive coaches who are experts in Coaching
              Psychology and use evidence-based methods.
            </p>
            <p>
              Our coaches bring decades of corporate experience, come from
              multiple industries and run their own businesses.
            </p>
            <p>
              Their coaching offers a hyper-personalised learning experience to
              grow as a leader and as a person.
            </p>
          </div>
          <img src={require("./imgs/h7b2.webp").default} alt="" />
        </div>
      </div>

      <div className="banner8">
        <img
          src={require("./imgs/h8bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div>
            <p>
              We started off with early-stage entrepreneurs and helped them to
              navigate the psychological challenges of forming their own
              businesses.
            </p>
          </div>
        </div>
      </div>

      <div className="banner9">
        <img
          src={require("./imgs/h9bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <div>Case study</div>
          <img src={require("./imgs/h9t1.webp").default} alt="" />
          <p>
            We connected 10 early-stage founders from the University of Sydney
            accelerator INCUBATE with evidence-based coaches .
          </p>
          <p>They received 5 digital coaching sessions in 10 weeks.</p>
        </div>
      </div>

      <div className="banner10">
        <div className="b-text">
          <div className="title">Results of 10 weeks of digital coaching </div>
          <div className="content">
            <div style={{ background: "#008afc" }}>
              <p>252% higher</p>
              <p>Psychological Well-being</p>
              <p>Including</p>
              <ul>
                <li>Autonomy</li>
                <li>Personal growth </li>
              </ul>
            </div>
            <div style={{ background: "#00eafa" }}>
              <p>65% higher</p>
              <p>Goal Attainment</p>
              <p>Including</p>
              <ul>
                <li>Leadership</li>
                <li>Performance </li>
              </ul>
            </div>
            <div style={{ background: "#dbdbdb" }}>
              <p>24% higher</p>
              <p>Solution-focused Thinking</p>
              <p>Including</p>
              <ul>
                <li>Goal orientation</li>
                <li>Problem disengagement </li>
              </ul>
            </div>
            <div style={{ background: "#ff00ff" }}>
              <p>21% lower</p>
              <p>Negative Emotions</p>
              <p>Including</p>
              <ul>
                <li>Anxiety </li>
                <li>Anger </li>
              </ul>
            </div>
            <div style={{ background: "#cfc7f2" }}>
              <p>11% higher</p>
              <p>Independent Thinking</p>
              <p>Including</p>
              <ul>
                <li>Motivational boost</li>
                <li>Confidence to change </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="banner11">
        <img
          src={require("./imgs/h6bg.webp").default}
          height="100%"
          width="100%"
          alt="bg"
        />
        <div className="b-text">
          <p>Testimonials from Emerging Leaders</p>
          <div class="color_11">
            “Hyper-personalised support!”
            <br />
            <br />
            <br />
            <br />
            “I received great frameworks and my coach helped me build actionable
            solutions to improve my focus, confidence and productivity."
            <br />
            <br />
            <br />
            <br />
            “I can strongly recommend my coach no matter your industry you work
            in.”
            <br />
            <br />
            <br />
            <br />
            “My coach was very adaptable and every session we tackled a new
            issue.”
            <br />
            <br />
            <br />
            <br />
            “Our sessions were tailored to work through my emotional triggers,
            blockers and how to recognise & handle them as they arise."
            <br />
            <br />
            <br />
            <br />
            “I feel my inner strength is much stronger, I am more assertive,
            super motivated and I am being brave."
            <br />
            <br />
          </div>
        </div>
      </div>

      <div className="banner12">
        <div className="one">
          <p>The Team</p>
          <div className="cards">
            <div>
              <p>Hannah Hinkelmann</p>
              <p>Founder</p>
              <img src={require("./imgs/h11p1.webp").default} alt="" />
              <img src={require("./imgs/h11in.webp").default} alt="" />

              <p>Head of Coaching, Sales and Marketing </p>
            </div>
            <div>
              <p>Saket Kuberi</p>
              <p>Founder</p>
              <img src={require("./imgs/h11p2.webp").default} alt="" />
              <img src={require("./imgs/h11in.webp").default} alt="" />

              <p>Head of Digital Product, Finance and Operations </p>
            </div>
          </div>
        </div>
        <div className="two">
          <p>INTERESTED?</p>
          <div>
            <input type="text" placeholder="Enter your email here*" />
            <button type="button">Get in touch with us</button>
          </div>
        </div>
        <div className="three">
          <div className="cs">
            <div>
              <p>ADDRESS</p>
              <p>53/17-19 Macarthur Street, Ultimo, Sydney, 2050 NSW</p>
            </div>
            <div>
              <p>EMAIL</p>
              <p>hannah.emerge@outlook.com saket.emerge@outlook.com</p>
            </div>
          </div>
          <p>© 2021 by EMERGE DIGITAL PTY LTD</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
