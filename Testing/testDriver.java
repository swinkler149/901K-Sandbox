package myPackage;
	 
	import org.openqa.selenium.WebDriver;
	import org.openqa.selenium.By;
	import org.openqa.selenium.firefox.FirefoxDriver;
	import org.openqa.selenium.WebElement;
	import org.openqa.selenium.support.ui.Select;
	import static org.junit.Assert.assertTrue;
	import java.util.List;
	 
	public class testDriver {
		
	    public static void main(String[] args) {
	        // declaration and instantiation of objects/variables
    	
	    	WebDriver driver = new FirefoxDriver();
	        String baseUrl = "http://54.175.60.221:3000/map";

/*
 * 			Corrolator-test-001  -- Bring up the Corrolator site  
 */
	        driver.get(baseUrl);			//Visit the CorrOlator URL
 			String actualTitle = driver.getTitle();
 			if (actualTitle.contentEquals("xxx")){
			    System.out.println("Title is correct!");
	         } else {
	        System.out.println("Title is incorrect.  Expecting XXX");
	         }
	        
	        //See if we have a banner section
	        if(driver.findElements(By.xpath("xxx")).size() != 0){		
	        	System.out.println("Banner is Present");
	        	}else{
	        	System.out.println("ERROR - Banner is Absent");
	        	}

	        //See if we have a Corrolator image	        
	        if(driver.findElements(By.xpath("xxx")).size() != 0){	
	        	System.out.println("Image is Present");
	        	}else{
	        	System.out.println("ERROR - CorrOlator Image is Absent");
	        	}	        

	        //See if we have a US map	        
	        if(driver.findElements(By.xpath("xxx")).size() != 0){	
	        	System.out.println("Map is Present");
	        	}else{
	        	System.out.println("ERROR - No U.S. Map");
	        	}	        

	        //See if we have a filter section	        
	        if(driver.findElements(By.xpath("xxx")).size() != 0){	
	        	System.out.println("Criteria Filter Section is Present");
	        	}else{
	        	System.out.println("ERROR - No Criteria Filter Section");
	        	}	        	        

/*
 * 			Corrolator-test-004 -- Ag code Drop-down is Correct	        
 */

//			See if the number of items is correct
	        Select se = new Select(driver.findElement(By.id("select drop down locator")));
	        int numOptions = se.getOptions().size();
	        if (numOptions == 54) { 
	        	System.out.println("Ag drop down is populated correctly");
	        	}else{
	        	System.out.println("ERROR - Inccorrect number of entries in Ag drop down.  " + numOptions + " found.  Expecting 54");
	        	}	        	        
	        
//			See if selected codes are present
	        List<WebElement> elements=se.getOptions();
	        String agCode = "Crambe";
	        for (WebElement elementIterator:elements)
	        {
	        	if(elementIterator.getText() == agCode) {
	        		System.out.println("Found " + agCode + " in the Ag drop down");
	        		}else{
	        		System.out.println("ERROR - Did not find " + agCode + " in the Ag drop down");
	        		}	  
	        	break;
	        }

//
// 			NEED TO ADD CHECKS FOR "Alcohol CoProducts", "Amaranth", "Camelina", "Guar", "Millet", "Triticale", "Wild Rice"	        
//
        	
/*
 * 			Corrolator-test-006 -- Occupation code Drop-down is Correct	        
 */

//	        			See if the number of items is correct
	        	        se = new Select(driver.findElement(By.id("select drop down locator")));
	        	        numOptions = se.getOptions().size();
	        	        if (numOptions == 23) { 
	        	        	System.out.println("Occupation drop down is populated correctly");
	        	        	}else{
	        	        	System.out.println("ERROR - Inccorrect number of entries in Ag drop down.  " + numOptions + " found.  Expecting 23");
	        	        	}	        	        
	        	        
//	        			See if selected codes are present
	        	        elements=se.getOptions();
	        	        String occupationCode = "35-000 Food Preparation and Serving Related Occupations";
	        	        for (WebElement elementIterator:elements)
	        	        {
	        	        	if(elementIterator.getText() == occupationCode) {
	        	        		System.out.println("Found " + occupationCode + " in the Occupation drop down");
	        	        		}else{
	        	        		System.out.println("ERROR - Did not find " + occupationCode + " in the Occupation drop down");
	        	        		}	  
	        	        	break;
	        	        }

//	        	        
// 			NEED TO ADD CHECKS FOR "00-000 All Occupations", "23-000 Legal Occupations", "51-000 Production Occupations", "53-000 Transportation and Material Moving Occupations"	        
//
	        
/*
 * 			Corrolator-test-004 -- Ag code Drop-down is Correct	        
 */

//			Select "Flaxseed and "Farming, Fishing, and Forestry Occupations" 	        	        
	        driver.findElement(By.xpath("xxx")).sendKeys("Flaxseed");
	        driver.findElement(By.xpath("xxx")).sendKeys("45-000 Farming, Fishing, and Forestry Occupations");

//			Navigate to Minnesota and verify totals
//	        WebElement agData = driver.findElement(By.xpath("xxx"));
//	        WebElement occData = driver.findElement(By.xpath("xxx"));

	        String agProof = "4000";
	        String occProof = "3530";

	        // Verify # acres of Flaxseed harvested  
	        assertTrue("Verification failed: Ag code is not " + agProof,agProof.equals(driver.findElement(By.id("xxx")).getText()));
	        //  OR //
	        assertTrue("Verification Failed: Ag code is not " + agProof,(driver.findElement(By.xpath("xxx")).getText().equalsIgnoreCase(agProof)));

	        // Verify # employees working in Farming, Fishing,a nd Forestry Occupations  
	        assertTrue("Verification failed: Occupation value is not " + occProof, agProof.equals(driver.findElement(By.id("xxx")).getText()));
	        //  OR //
	        assertTrue("Verification Failed: Occupationn value is not " + occProof,(driver.findElement(By.xpath("xxx")).getText().equalsIgnoreCase(agProof)));
	        
	        
	        //close Firefox
	        driver.close();
	        
	        // exit the program explicitly
	        System.exit(0);
	    }
	 
	}
