import Page from "../common/Page";
import classes from "./ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const ProfilePage = () => {
  return (
    <Page>
      <div className={classes.wrapper}>
        <div className={classes.sidebar}>Profile Name</div>
        <div className={classes.body}>
          <div className={classes.profile}>
            <h2>IDENTITY</h2>
            <div className={classes.content_box}>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>Bruce Wayne</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>rentup@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>221B Baker Street </td>
                  </tr>
                  <tr>
                    <td>Hobbies</td>
                    <td>:</td>
                    <td>Punching the bad guys</td>
                  </tr>
                  <tr>
                    <td>Job</td>
                    <td>:</td>
                    <td>World's Greatest Detective</td>
                  </tr>
                  <tr>
                    <td>Skill</td>
                    <td>:</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2>SOCIAL MEDIA</h2>
            <div className={classes.content_box} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <a
                href="https://www.facebook.com/trungtu.nguyen.315/"
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.facebook}>
                  <FontAwesomeIcon icon={faFacebookF} className={classes.icon}/>
                </div>
              </a>
              <a
                href="https://www.facebook.com/trungtu.nguyen.315/"
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.instagram}>
                  <FontAwesomeIcon icon={faInstagram} className={classes.icon}/>
                </div>
              </a>
              <a
                href="https://www.facebook.com/trungtu.nguyen.315/"
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.twitter}>
                  <FontAwesomeIcon icon={faTwitter} className={classes.icon}/>
                </div>
              </a>
              <a
                href="https://www.facebook.com/trungtu.nguyen.315/"
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.linkedin}>
                  <FontAwesomeIcon icon={faLinkedin} className={classes.icon}/>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ProfilePage;
