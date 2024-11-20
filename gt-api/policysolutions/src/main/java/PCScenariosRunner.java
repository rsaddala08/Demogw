import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = {"src/main/java/gw/cucumber/"},
        glue = {"gw"},
        strict = true,
        plugin = { "html", "html:target/cucumber-reports/report.html",
                "json:target/cucumber-reports/Cucumber.json",
                "junit:target/cucumber-reports/Cucumber.xml" },
        tags = "@<Tag_Name>"
)
public class PCScenariosRunner {
}
