package de.uni_potsdam.hpi.metanome.frontend.server;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import de.uni_potsdam.hpi.metanome.frontend.client.InputParameter;
import junit.framework.TestCase;

public class ParameterServiceTest extends TestCase {
	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	
	@Test
	public void testRetrieveUniqueColumnCombinationsParameters() {
		//Setup
		ParameterServiceImpl parameterService = new ParameterServiceImpl();
		String jarFilePath = ClassLoader.getSystemResource("testjar.jar").getFile();
		
		//Execute
		List<InputParameter> inputParameters = parameterService.retrieveUniqueColumnCombinationsParameters(jarFilePath);
		
		//Check
		assertNotNull(inputParameters);
	}

}
